import { format } from "date-fns";

export const handleDate = (dateString: string | undefined) => {
    if (dateString !== undefined) {
        const dateObject = new Date(dateString);
        return format(dateObject, 'dd/MM/yyyy');
    }
}

export const handleMoney = (valor: number | undefined) => {
    if (valor !== undefined) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(valor);
    }
}

export const handleNumero = (valor: number | undefined) => {
    if (valor !== undefined) {
        return new Intl.NumberFormat('pt-BR').format(valor);
    }
}

export const handlePercentage = (decimal: number | undefined) => {
    if (decimal !== undefined) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(decimal);
    }
}