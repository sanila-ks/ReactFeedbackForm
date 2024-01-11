import { Box, Button, Grid, ThemeProvider, Typography, createTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
// import { saveFeedbackResult } from "../store/feedbackSlice";
import { AddAction } from "../store/feedbackAction";
import { grey } from "@mui/material/colors";

export default function Summary(props) {
    const theme = createTheme({
        palette: {
            primary: {
                main: 'rgb(84, 2, 216)',
            },
            secondary: grey
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        marginTop: '20px',
                        marginLeft: '40px'
                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        fontWeight: "bold"
                    }
                }
            }
        }
    })

    const dispatch = useDispatch();
    const feedbackResult = useSelector((state) => state.feedbackDataset);

    const submitHandler = (args) => {
        dispatch(AddAction(JSON.stringify(args)))
        // dispatch(saveFeedbackResult(JSON.stringify(args)))
    }

    const animationStyle = {
        animation: 'xTransform 1s ease-in-out',
        '@keyframes xTransform': {
            from: { opacity: 0, transform: 'translateX(50%)' },
            to: { opacity: 1, transform: 'translateX(0)' },
        },
    }

    return (
        <ThemeProvider theme={theme}>
            <Box paddingLeft={'20px'}>
                <Typography variant="h2" width={"40%"}
                    marginTop={'20px'} marginLeft={'40px'}
                    className="summary-heading"
                    sx={animationStyle}
                >An overview of your answers</Typography>
                <ul>
                    {feedbackResult.map(item => {
                        return (<>
                            <li key={item.Id} style={{
                                "listStyleType": "none",
                                ...animationStyle
                            }}>
                                <Grid container>
                                    <Grid item xs={8}>
                                        <Typography variant="h5"
                                            className="summary-questions"
                                            gutterBottom>{item.Question}</Typography>
                                        <Typography variant="body2"
                                            color={"secondary"}
                                            gutterBottom>{item.Question}</Typography>
                                    </Grid>
                                    <Grid item xs={4} className="centered-content">
                                        {item.Option === "Good"
                                            ? <span className="summary-icon">&#128077;</span>
                                            : item.Option === "Not sure"
                                                ? <span className="summary-icon">&#129300;</span>
                                                : <span className="summary-icon">&#128078;</span>
                                        }
                                    </Grid>
                                </Grid>
                                <hr />
                            </li>
                        </>)
                    })}
                </ul>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ ...animationStyle, marginBottom: "15px" }}
                    disabled={feedbackResult.length > 0 ? false : true}
                    onClick={() => submitHandler(feedbackResult)}
                >Submit</Button>
            </Box>
        </ThemeProvider >
    )
}
