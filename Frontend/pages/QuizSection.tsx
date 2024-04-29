


import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
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

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

type QuizModalProperties = {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizModal: React.FC<QuizModalProperties> = ({ isModalOpen, setIsModalOpen }) => {
    const questions = [
    {
        referencedAnswer: "geography_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "institution_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "subjects_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "social_environment_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "academic_environment_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "group_engagement_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "loneliness_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "stress_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "lectures_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "literature_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "student_job_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "teaching_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "dislike_exam_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "internship_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "international_stay_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "starting_salary_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "general_salary_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "experienced_salary_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "unemployment_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "fixed_hours_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "flexible_hours_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "self_schedule_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "variable_schedule_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "night_and_evening_shifts_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "high_workload_acceptance_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "degree_relevance_priority",
        question: "?",
        text: "",
    },
    {
        referencedAnswer: "work_internationally_priority",
        question: "?",
        text: "",
    },
                
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const currentQuestion = questions[currentQuestionIndex];

  const getProgress = () => (currentQuestionIndex) / questions.length * 100;

  const [sliderValue, SetSliderValue] = React.useState(3);
  const sliderMarks = [
    {
        value: 1,
        label: "Not Important"
    },
    {
        value: 5,
        label: "Very Important"
    }
  ]


  const [quizAnswerState, SetQuizAnwerState] = React.useState<QuizAnswers>();


    const HandleNextQuestion = () => {
        
        const newAnswer = ({
            ...quizAnswerState,
            [currentQuestion.referencedAnswer]: sliderValue
        });
        SetQuizAnwerState(newAnswer);

        const isLastQuestion = (currentQuestionIndex + 1) == questions.length;
        if (isLastQuestion){
            setIsModalOpen(false);
            setCurrentQuestionIndex(0);
            return;
        }

        SetSliderValue(3);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>            
            <Box sx={{ ...style, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ textAlign: "center" }}>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                Preference Quiz
                </Typography>
                <Typography variant="h6" component="h3" mt={2}>
                {"Question " + (currentQuestionIndex + 1)}
                </Typography>
                <Typography mt={1}>
                {currentQuestion.text}
                </Typography>
                <Slider onChange={(e, value) => SetSliderValue(Number(value))}
                aria-label="discrete-slider-custom"
                defaultValue={3}
                value={sliderValue}
                step={1}
                marks={sliderMarks}
                min={1}
                max={5}
                valueLabelDisplay="auto"
                />
                <Button onClick={HandleNextQuestion}>
                Next Question
                </Button>                
                <LinearProgressWithLabel value={getProgress()} />
            </div>
            </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default QuizModal;