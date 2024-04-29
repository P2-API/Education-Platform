


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { QuizAnswers } from ',,/../../src/types.tsx'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const questions = [
    {
      id: 1,
      tag: "salary_priorty",
      question: "How much do you agree with this statement?",
      text: "This is the first question.",
    },
    {
      id: 2,
      question: "What is your opinion on the following?",
      text: "This is the second question.",
    },
    {
      id: 3,
      question: "Wow such statement?",
      text: "This is the third question.",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const currentQuestion = questions[currentQuestionIndex].tag;

  const [sliderValue, SetSliderValue] = React.useState(3);

  const [quizAnswerState, SetQuizAnwerState] = React.useState<QuizAnswers>();


  const HandleNextQuestion = () => {
    SetQuizAnwerState(prev => ({
      ...prev,
      currentQuestion: sliderValue
    }));
    SetSliderValue(3);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: "center" }}>
            <Typography id="modal-modal-title" variant="h3" component="h2">
              Preference Quiz
            </Typography>
            <Typography variant="h6" component="h3" mt={2}>
              {currentQuestion.question}
            </Typography>
            <Typography mt={1}>
              {currentQuestion.text}
            </Typography>
            <Slider onChange={(e, value) => SetSliderValue(Number(value))}
              aria-label="discrete-slider-custom"
              defaultValue={3}
              value={sliderValue}
              step={1}
              marks
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
            <Button onClick={HandleNextQuestion}>
              Next Question
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}