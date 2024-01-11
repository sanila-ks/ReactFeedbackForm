import { Grid } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import Questionnaire from "./Questionnaire";
import Summary from "./Summary";
import Options from "./Options";
import { useDispatch } from "react-redux";
import { GetAction } from "../store/feedbackAction";

export const SharedStateContext = createContext();

export default function LayoutPage() {
    const dispatch = useDispatch();
    const [FeedbackCompleted, setFeedbackCompleted] = useState(false)
    const [activeId, setActiveId] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(0);

    useEffect(() => {
        dispatch(GetAction())
    }, [dispatch])

    return (
        <SharedStateContext.Provider value={{
            FeedbackCompleted, setFeedbackCompleted,
            activeId, setActiveId,
            hoveredIndex, setHoveredIndex,
            currentIndex, setCurrentIndex,
            isAnimating, setIsAnimating,
        }}>
            <Grid container spacing={0} height={'100vh'}>
                <Grid item
                    xs={!FeedbackCompleted ? 10 : 1}
                    sm={!FeedbackCompleted ? 6 : 1}
                >
                    <Questionnaire />
                </Grid>
                <Grid item
                    xs={!FeedbackCompleted ? 2 : 11}
                    sm={!FeedbackCompleted ? 6 : 11}
                >
                    {!FeedbackCompleted ? <Options /> : <Summary />}
                </Grid>
            </Grid>
        </SharedStateContext.Provider>
    )
}