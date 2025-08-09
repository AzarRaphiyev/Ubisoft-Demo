import { createContext, useEffect, useState } from "react";
import { getAllDLCs, getAllGames, getAllNews, getAllSliders, getAllUniverse } from "../services/GameService";

export const GameContext = createContext();

const DataContext = ({ children }) => {
    const [gamedata, setGameData] = useState([]);
    const [sliderdata, setSliderData] = useState([]);
    const [dlcdata, setDlcData] = useState([]);
    const [universedata, setUniverseData] = useState([]);
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        
        Promise.all([
            getAllGames(),
            getAllDLCs(), 
            getAllSliders(),
            getAllUniverse(),
            getAllNews()
        ])
        .then(([games, dlcs, sliders,universe,news]) => {
            setGameData(games);
            setDlcData(dlcs);
            setSliderData(sliders);
            setUniverseData(universe);
            setNews(news)
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
        universedata,
        news,
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