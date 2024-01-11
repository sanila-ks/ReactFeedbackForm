import { useContext, useEffect, useState } from "react"
import { Card, CardContent, Grid, Radio, Stack, Typography } from "@mui/material"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { SharedStateContext } from "./LayoutPage";
import { useSelector } from "react-redux";

export default function Questionnaire(props) {
    const questionSet = useSelector(state => state.feedbackQuestions)
    const {
        FeedbackCompleted, setFeedbackCompleted,
        activeId, setActiveId,
        hoveredIndex, setHoveredIndex,
        currentIndex, setCurrentIndex,
        isAnimating, setIsAnimating,
    } = useContext(SharedStateContext)

    useEffect(() => {
        setActiveId(questionSet[0]?.id)
    }, [questionSet])

    const updateIndex = (event) => {
        if (event.target.value === "-1") {
            setActiveId(event.target.value)
            setCurrentIndex(-1)
            setFeedbackCompleted(true)
        } else {
            setTimeout(() => {
                setIsAnimating(false);
                let index = questionSet.findIndex(item => item.id === event.target.value)
                setCurrentIndex(index);
                setActiveId(event.target.value)
            }, 500);
        }
    };

    const radioButtonChange = (args) => {
        setIsAnimating(true)
        updateIndex(args)
    }

    const _renderRadioButton = (id) => {
        return (
            <Radio
                value={id}
                checked={activeId == id}
                onChange={(args) => radioButtonChange(args)}
                name="radio-buttons"
                sx={{
                    color: "white",
                    '&.Mui-checked': { color: "white" }
                }} />
        )
    }

    return (
        <Card
            onMouseEnter={() => {
                if (FeedbackCompleted) {
                    setFeedbackCompleted(false)
                    setHoveredIndex(null)
                    setCurrentIndex(0)
                    setActiveId(questionSet[0]?.id)
                }
            }}
            className="question-card"
            sx={{
                backgroundColor: 'rgb(84, 2, 216)',
                color: 'white',
                borderRadius: 0,
            }}
        >
            <AutoStoriesIcon className="story-icon" />
            {questionSet.length > 0 && <Grid
                container
                className="centered-content"
                height={'100%'}
            >
                <Grid item xs={1}>
                    <Stack>
                        {questionSet.map(item => { return _renderRadioButton(item.id) })}
                        {_renderRadioButton("-1")}
                    </Stack>
                </Grid>
                <Grid item xs={11}>
                    {!FeedbackCompleted
                        ? <CardContent padding={'20px'} >
                            <Typography variant='h3' fontWeight={'bold'}
                                sx={{
                                    animation: isAnimating === true ? 'yTransform 0.5s ease-in-out' : 'none',
                                    '@keyframes yTransform': {
                                        from: { opacity: 1, transform: 'translateY(0)' },
                                        to: { opacity: 0, transform: 'translateY(-400px)' },
                                    },
                                }}
                            >{questionSet[currentIndex]?.question}</Typography>
                        </CardContent>
                        : <></>}
                </Grid>
            </Grid>}
        </Card>
    )
}