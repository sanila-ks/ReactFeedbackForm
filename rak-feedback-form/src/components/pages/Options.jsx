import { Box, Stack } from "@mui/material"
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SharedStateContext } from "./LayoutPage";
import { saveFeedback } from "../store/feedbackSlice";

export default function Options(props) {
    const dispatch = useDispatch();
    const questionSet = useSelector(state => state.feedbackQuestions)
    const {
        FeedbackCompleted, setFeedbackCompleted,
        activeId, setActiveId,
        hoveredIndex, setHoveredIndex,
        currentIndex, setCurrentIndex,
        isAnimating, setIsAnimating,
    } = useContext(SharedStateContext)

    let OptionsList = [
        { icon: '\u{1F44D}', text: "Good" },
        { icon: '\u{1F914}', text: "Not sure" },
        { icon: '\u{1F44E}', text: "Bad" }
    ]

    const setOption = (question, option) => {
        setTimeout(() => {
            setIsAnimating(false);
            dispatch(saveFeedback({
                Id: question.id,
                Question: question.question,
                Option: option
            }))
            if (currentIndex < questionSet.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setActiveId(questionSet[currentIndex + 1].id)
            } else {
                setActiveId('-1')
                setCurrentIndex(0)
                setFeedbackCompleted(true)
            }

        }, 500);
    }

    const optionChange = (value) => {
        setIsAnimating(true)
        setOption(questionSet[currentIndex], value)
    }

    const _renderOptionBox = (icon, index, value) => {
        return (
            <Box
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => optionChange(value)}
                sx={{
                    filter: hoveredIndex === null || hoveredIndex === index ? 'none' : 'blur(5px)',
                    transition: 'transition: transform 0.3s ease filter 0.3s',
                    transform: hoveredIndex === index ? 'translateY(-20px)' : 'none',
                    cursor: 'pointer',
                    fontSize: '70px',
                    '@media (max-width: 600px)': {
                        fontSize: '35px'
                    },
                }}
            >{icon}
                <div className="option-label" style={{ display: hoveredIndex === index ? 'block' : 'none' }}>{value}</div>
            </Box>
        )
    }

    return (
        <Stack spacing={3} className="centered-content" height={'100vh'}
            sx={{
                flexDirection: 'row',
                animation: isAnimating === true ? 'yTransform 0.5s ease-in-out' : 'none',
                '@keyframes yTransform': {
                    from: { opacity: 1, transform: 'translateY(0)' },
                    to: { opacity: 0, transform: 'translateY(-400px)' },
                },
                '@media (max-width: 600px)': {
                    flexDirection: 'column'
                },
            }}
        >
            {OptionsList.map((item, index) => {
                return _renderOptionBox(item.icon, index + 1, item.text)
            })}
        </Stack>
    )
}