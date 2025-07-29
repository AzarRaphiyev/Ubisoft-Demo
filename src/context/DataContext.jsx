import { createContext, useEffect, useState } from "react";
import { getAllDLCs, getAllGames, getAllSliders } from "../services/GameService";

export const GameContext = createContext();

const DataContext = ({ children }) => {
    const [gamedata, setGameData] = useState([]);
    const [sliderdata, setSliderData] = useState([]);
    const [dlcdata, setDlcData] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        
        Promise.all([
            getAllGames(),
            getAllDLCs(), 
            getAllSliders()
        ])
        .then(([games, dlcs, sliders]) => {
            setGameData(games);
            setDlcData(dlcs);
            setSliderData(sliders);
        })
        .catch(err => {
            console.error('API Error:', err);
            setError(err);
        })
        .finally(() => {
            setLoader(false); 
        });
        
    }, []);

    const obj = {
        gamedata,
        sliderdata, 
        dlcdata,
        error,
        loader
    };

    return (
        <GameContext.Provider value={obj}>
            {children}
        </GameContext.Provider>
    );
};

export default DataContext;