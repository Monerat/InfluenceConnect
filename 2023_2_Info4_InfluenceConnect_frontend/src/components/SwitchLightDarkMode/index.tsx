import { Switch } from "./styles"

interface Props {
    label: string;
    onToggle: () => void;
}

export const SwitchLightDarkMode: React.FC<Props> = ({ onToggle, label }) => {

    let checked: boolean = false
    
    localStorage.getItem('theme') ? checked = true : checked = false

    return (
        <Switch aria-label={label}>
            <input
                type="checkbox"
                onChange={onToggle}
                title='Auto-contraste'
                aria-label='Ativar alto contraste'
                checked={checked}
            />
            <span className="slider"></span>
        </Switch>
    )
}