import { z } from "zod";

// equilavente a 10 MB
const MAX_FILE_SIZE = 10485760;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
]

export const createLoginSchema = z.object({
    email: z
        .string()
        .nonempty({
            message: "O e-mail é obrigatório",
        })
        .email({
            message: "Formato de e-mail inválido",
        })
        .toLowerCase(),
    senha: z
        .string()
        .nonempty({
            message: "A senha é obrigatória.",
        })
        .min(6, {
            message: "A senha é deve conter pelo menos 6 caracteres.",
        }),
});

export const createInfluencerSchema = z
    .object({
        nome: z.string().nonempty().toLowerCase(),

        email: z
            .string()
            .nonempty({
                message: "O e-mail é obrigatório",
            })
            .email({
                message: "Formato de e-mail inválido",
            })
            .toLowerCase(),

        cpf: z
            .string()
            .nonempty({
                message: "O cpf é obrigatório",
            })
            .length(14, "O formato de cpf é 123.456.789-00"),

        senha: z
            .string()
            .nonempty({
                message: "A senha é obrigatória",
            })
            .min(6, {
                message: "A senha deve conter pelo menos 6 caracteres",
            }),

        confirmarSenha: z
            .string()
            .nonempty({
                message: "A senha é obrigatória",
            })
            .min(6, {
                message: "As senhas devem ser iguais",
            }),

        nomeFantasia: z.string().nonempty({
            message: "O nome fantasia é obrigatório",
        }),

        cep: z
            .string()
            .nonempty({
                message: "O Cep fantasia é obrigatório",
            })
            .length(8, "O cep deve conter 8 caracteres e apenas números"),

        numero: z.string().nonempty({
            message: "O número é obrigatório",
        }),

        tipoEndereco: z.string().nonempty(),

        nicho: z.object({
            nomeNicho: z.string().nonempty({
                message: "O nome do nicho é obrigatório",
            }),

            descricao: z.string().nonempty({
                message: "A descrição é obrigatório",
            }),

            faixaEtaria: z.string().nonempty({
                message: "A faixa etária do nicho é obrigatória",
            }),

            genero: z.string().nonempty({
                message: "O genero do nicho é obrigatória",
            }),
        }),

        redesSociais: z.array(
            z.object({
                nomeRede: z.string().nonempty({
                    message: "O nome da rede social é obrigatório",
                }),

                arroba: z.string().nonempty({
                    message: "O arroba da rede social é obrigatório",
                }),

                link: z.string().nonempty({
                    message: "O link da rede social é obrigatório",
                }),

                custoPubli: z.string().nonempty({
                    message: "O custo da publicidade é obrigatório",
                }),

                taxaEngajamento: z.string(),

                quantidadeSeguidores: z.string().nonempty({
                    message: "A quantidade de seguidores é obrigatória",
                }),

                regiaoAtuacao: z.string().nonempty({
                    message: "A região de atuação é obrigatória",
                }),
            })
        ),

        imagens: z.object({
            perfil: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed1: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed2: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed3: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            background: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),
        }),
    })
    .refine((data) => data.confirmarSenha === data.senha, {
        message: "As senhas devem ser iguais",
        path: ["confirmarSenha"],
    });

export const atualizarInfluencerSchema = z
    .object({
        nome: z.string().toLowerCase().optional(),

        nomeFantasia: z.string().optional(),

        email: z.string().toLowerCase().optional(),

        cpf: z.string().optional(),

        cep: z.string().optional(),

        numero: z.string().optional(),

        tipoEndereco: z.string().optional(),

        senha: z.string().optional(),

        confirmarSenha: z.string().optional(),

        nicho: z.object({
            nomeNicho: z.string().optional(),

            descricao: z.string().optional(),

            faixaEtaria: z.string().optional(),

            genero: z.string().optional(),
        }),

        redeSocial: z.object({
            idRedeAtualizar: z.string().optional(),

            nomeRedeNova: z.string().optional(),

            arroba: z.string().optional(),

            link: z.string().optional(),

            custoPubli: z.string().optional(),

            quantidadeSeguidores: z.string().optional(),

            taxaEngajamento: z.string().optional(),

            regiaoAtuacao: z.string().optional()

        }),

        imagens: z.object({
            perfil: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed1: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed2: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed3: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            background: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),
        }),
    })
    .refine((data) => data.confirmarSenha === data.senha, {
        message: "As senhas devem ser iguais",
        path: ["confirmarSenha"],
    });

export const createMarcaSchema = z
    .object({
        nomeEmpresa: z
            .string()
            .nonempty({
                message: "O nome é obrigatório",
            })
            .toLowerCase(),

        cnpj: z.string().nonempty({
            message: "O cnpj é obrigatório",
        }),

        segmento: z.string().nonempty({
            message: "O segmento é obrigatório",
        }),

        nome: z
            .string()
            .nonempty({
                message: "O nome é obrigatório",
            })
            .toLowerCase(),

        email: z
            .string()
            .nonempty({
                message: "O e-mail é obrigatório",
            })
            .email({
                message: "Formato de e-mail inválido",
            })
            .toLowerCase(),

        cpf: z
            .string()
            .nonempty({
                message: "O cpf é obrigatório",
            })
            .length(14, "O formato de cpf é 123.456.789-00"),

        senha: z
            .string()
            .nonempty({
                message: "A senha é obrigatória",
            })
            .min(6, {
                message: "A senha deve conter pelo menos 6 caracteres",
            }),

        confirmarSenha: z
            .string()
            .nonempty({
                message: "A senha é obrigatória",
            })
            .min(6, {
                message: "As senhas devem ser iguais",
            }),

        cep: z
            .string()
            .nonempty({
                message: "O Cep fantasia é obrigatório",
            })
            .length(9, "O cep deve conter 8 caracteres e apenas números"),

        numero: z.string().nonempty({
            message: "O número é obrigatório",
        }),

        tipoEndereco: z.string().nonempty(),

        imagens: z.object({
            perfil: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed1: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed2: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed3: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            background: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),
        }),
    })
    .refine((data) => data.confirmarSenha === data.senha, {
        message: "As senhas devem ser iguais",
        path: ["confirmarSenha"],
    });

export const atualizarMarcaSchema = z
    .object({

        nomeEmpresa: z.string().toLowerCase().optional(),

        cnpj: z.string().toLowerCase().optional(),

        segmento: z.string().toLowerCase().optional(),

        nome: z.string().toLowerCase().optional(),

        email: z.string().toLowerCase().optional(),

        cpf: z.string().toLowerCase().optional(),

        senha: z.string().toLowerCase().optional(),

        confirmarSenha: z.string().toLowerCase().optional(),

        cep: z.string().toLowerCase().optional(),

        numero: z.string().toLowerCase().optional(),

        tipoEndereco: z.string().toLowerCase().optional(),

        imagens: z.object({
            perfil: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed1: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed2: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed3: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            background: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),
        }),
    })
    .refine((data) => data.confirmarSenha === data.senha, {
        message: "As senhas devem ser iguais",
        path: ["confirmarSenha"],
    });

export const createCampanhaSchema = z
    .object({

        inicioCampanha: z.string().nonempty({
            message: "A data de início da campanha deve ser no futuro",
        }),

        encerramentoCampanha: z.string().nonempty({
            message:
                "A data de encerramento da campanha deve ser maior que a data de início",
        }),

        orcamento: z.string().nonempty({
            message: "É necessário inserir um valor para a campanha",
        }),

        nicho: z.string().nonempty({
            message: "O nicho é obrigatório",
        }),

        nomeCampanha: z
            .string()
            .nonempty({
                message: "O nome da campanha é obrigatório",
            })
            .toLowerCase(),

        idEmpresa: z
            .string()
            .nonempty({
                message: "O nome da marca é obrigatório",
            })
            .toLowerCase(),

        imagens: z.object({
            perfil: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed1: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed2: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed3: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            background: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),
        }),
    })
    .refine((data) => data.encerramentoCampanha > data.inicioCampanha, {
        message:
            "A data de encerramento da campanha deve ser maior que a data de início",
        path: ["encerramentoCampanha"],
    })

export const atualizarCampanhaSchema = z
    .object({

        inicioCampanha: z.string().optional(),

        encerramentoCampanha: z.string().optional(),

        orcamento: z.string().optional(),

        nicho: z.string().optional(),

        nomeCampanha: z.string().optional(),

        imagens: z.object({
            perfil: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed1: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed2: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            feed3: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),

            background: z
                .instanceof(FileList)
                .refine(
                    (files) => !files.item(0) || files.item(0)!.size <= MAX_FILE_SIZE,
                    `Tamanho máximo de 5MB`
                )
                .refine(
                    (files) => !files.item(0) || ACCEPTED_IMAGE_TYPES.includes(files.item(0)!.type),
                    "Formato de imagem inválido"
                )
                .transform((files) => {
                    return files.item(0) || null;
                }),
        }),
    })
