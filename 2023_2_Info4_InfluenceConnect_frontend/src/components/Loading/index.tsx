import { useContext } from "react"
import { Infinity } from "./infinity"
import { SpinnerContainer } from "./styles"
import { ThemeContext } from "../../context/themeContext"

export const Loading = () => {

    const { darkMode } = useContext(ThemeContext)

    return (

        <SpinnerContainer
            $darkMode={darkMode}
        >
            <div className="spinnerContainer">
                <Infinity />
                <div className="loader">
                    <p>loading</p>
                    <div className="words">
                        <span className="word">posts</span>
                        <span className="word">images</span>
                        <span className="word">followers</span>
                        <span className="word">hashtags</span>
                    </div>
                </div>
            </div>
        </SpinnerContainer>
    )
}

