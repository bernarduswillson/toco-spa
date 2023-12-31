import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import useToken from '../../hooks/useToken';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from '../../components/organisms/Sidebar';
import Breadcrumbs from '../../components/organisms/Breadcrumbs';
import PageTitle from '../../components/atoms/PageTitle';
import TextInput from '../../components/atoms/TextInput';
import Select from '../../components/atoms/Select';
import QuestionForm from '../../components/molecules/QuestionForm';
import ConfirmationModal from '../../components/organisms/ConfirmationModal';

interface OptionData {
  option_id: number;
  option: string;
  is_correct: boolean;
};

interface QuestionData {
  question_id: number;
  question: string;
  options: OptionData[];
};

interface ExerciseData {
  exe_name: string;
  category: string;
  difficulty: string;
  language_id: number;
  questions: QuestionData[]
};

const Create = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { showToast } = useToast();
  const { removeToken } = useToken();
  const token = auth.token;

  // URL Path ==============================
  const urlPath = [
    {
      id: 0,
      name: "Dashboard",
      url: "/",
      active: false
    },
    {
      id: 1,
      name: "Exercises",
      url: "/exercise",
      active: false
    },
    {
      id: 2,
      name: "New",
      url: "/exercise/create",
      active: true
    },
  ];
  // =======================================

  // Input values ==========================
  // Initial exercise data
  const [exerciseData, setExerciseData] = useState<ExerciseData>({
    exe_name: '',
    category: '',
    difficulty: 'Beginner',
    language_id: 1,
    questions: [
      {
        question_id: 0,
        question: "",
        options: [
          {
            option_id: 0,
            option: "",
            is_correct: false
          },
          {
            option_id: 1,
            option: "",
            is_correct: false
          },
          {
            option_id: 2,
            option: "",
            is_correct: false
          },
          {
            option_id: 3,
            option: "",
            is_correct: false
          },
        ]
      }
    ]
  });

  // Validation
  const [isDataValid, setIsDataValid] = useState<boolean>(true);

  const isQuestionsValid = () => {
    let result = true;
    exerciseData.questions.forEach((question) => {
        question.question &&
        question.options &&
        (
          question.options[0].option &&
          question.options[1].option &&
          question.options[2].option &&
          question.options[3].option
        ) ? (
          result = true  
        ) : (
          result = false
        )
    })
    return result;
  }

  useEffect(() => {
    exerciseData.exe_name &&
    exerciseData.category &&
    exerciseData.difficulty &&
    exerciseData.language_id &&
    exerciseData.questions &&
    isQuestionsValid() ? (
      setIsDataValid(true)
    ) : (
      setIsDataValid(false)
    )
  }, [exerciseData]);
  
  // Exercise input type text handler
  const handleExerciseInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    setExerciseData({ ...exerciseData, [name]: value });
  };

  // Exercise select handler
  const handleExerciseSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    
    setExerciseData({ ...exerciseData, [name]: value });
    // console.log(name + ' : ' + value);
  };

  // Question text area handler
  const handleQuestionTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value} = e.target;
    const key = e.currentTarget.getAttribute('questionid-key');
    
    setExerciseData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question) =>
        question.question_id === Number(key) ? {
          ...question,
          [name]: value
        } : question
      )
    }));
  };

  // Option input type text handler
  const handleOptionInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const key = e.currentTarget.getAttribute('optionid-key');
    const questionId = e.currentTarget.getAttribute('questionid-key');
    
    setExerciseData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question) => {
        if (question.question_id === Number(questionId)) {
          return {
            ...question,
            options: question.options.map((option) =>
              option.option_id === Number(key) ? {
                ...option,
                [name]: value
              } : option
            )
          }
        }
        return question;
      })
    }));
  };

  // Option input type radio handler
  const handleOptionRadioChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { checked } = e.target;
    const optionId = e.currentTarget.getAttribute('optionid-key');
    const questionId = e.currentTarget.getAttribute('questionid-key');

    setExerciseData((prevData) => ({
      ...prevData,
      questions: prevData.questions.map((question) => {
        if (question.question_id === Number(questionId)) {
          return {
            ...question,
            options: question.options.map((option) =>
              option.option_id === Number(optionId) && checked ? {
                ...option,
                is_correct: true
              } : {
                ...option,
                is_correct: false
              }
            )
          }
        }
        return question;
      })
    }));
  };
  // =======================================

  // Filter options ========================
  const difficultyOption = [
    {
      option: 'Beginner',
      value: 'Beginner'
    },
    {
      option: 'Intermediate',
      value: 'Intermediate'
    },
    {
      option: 'Advanced',
      value: 'Advanced'
    },
  ];

  // Harus connect ke PHP
  // Language Options
  // const [languageOption, setLanguageOption] = useState([]);
  // useEffect(() => {
  //   const fetchLanguages = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8008/api/endpoint/language.php');
  //       // nnti lanjut
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   }
  // }, [])

  const languageOption = [
    {
      option: 'English',
      value: 1
    },
    {
      option: 'Indonesian',
      value: 2
    },
    {
      option: 'Francais',
      value: 3
    },
    {
      option: 'Deutsch',
      value: 4
    },
  ];
  // =======================================
  
  // Add question ==========================
  const [questionCount, setQuestionCount] = useState<number>(1);

  // Add question button handler
  const handleAddQuestion = () => {
    const defaultQuestion = {
      question_id: questionCount,
      question: "",
      options: [
        {
          option_id: 0,
          option: "",
          is_correct: false
        },
        {
          option_id: 1,
          option: "",
          is_correct: false
        },
        {
          option_id: 2,
          option: "",
          is_correct: false
        },
        {
          option_id: 3,
          option: "",
          is_correct: false
        },
      ]
    };

    setExerciseData(prevData => ({
      ...prevData,
      questions: [...prevData.questions, defaultQuestion]
    }));

    setQuestionCount((prev) => prev + 1);
  };
  // =======================================
  
  // Delete question =======================
  const [deleteQuestionId, setDeleteQuestionId] = useState<number>();
  const [isDeleteModalOpen, setIsDeleteModelOpen] = useState<boolean>(false);
  const [isDeleteErrorModalOpen, setIsDeleteErrorModalOpen] = useState<boolean>(false);

  // Delete question button handler (opens confirmation modal)
  const handleDeleteQuestion = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const questionId = e.currentTarget.getAttribute('questionid-key');
    
    setDeleteQuestionId(Number(questionId));

    setIsDeleteModelOpen(true);
  };

  // Delete question button (confirmed)
  const handleConfirmDelete = () => {

    if (exerciseData.questions.length <= 1) {
      handleDeleteError();
      return;
    }

    setExerciseData((prevData) => ({
      ...prevData,
      questions: prevData.questions.filter(
        (question) => question.question_id !== Number(deleteQuestionId)
      )
    }));
  };

  // Delete error (when there is only one question exists)
  const handleDeleteError = () => {
    setIsDeleteErrorModalOpen(true);
  }
  
  // Handle cancel delete
  const handleDeleteModalCancel = () => {
    setIsDeleteModelOpen(false);
  }

  // Handel close delete error modal
  const handleCloseDeleteErrorModal = () => {
    setIsDeleteErrorModalOpen(false);
  }
  // =======================================

  // Release exercise ======================
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState<boolean>(false);
  
  // Release exercise button handler (opens confirmation modal)
  const handleReleaseExercise = () => {
    setIsReleaseModalOpen(true);
  };

  // Handle release
  const handleConfirmRelease = async () => {
    if (!isDataValid) {
      showToast('Field cannot be empty!', 'error');
      return;
    }

    try {
      const exerciseResponse = await axios.post('http://localhost:5000/exercise/create', {
        exe_name: exerciseData.exe_name,
        language_id: exerciseData.language_id,
        category: exerciseData.category,
        difficulty: exerciseData.difficulty,
        questions: exerciseData.questions
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (exerciseResponse.status === 200) {
        showToast('Release successful!', 'success');
        navigate('/exercise');
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        removeToken();
        navigate('/login');
      }
    }
  }

  // Handle cancel
  const handleReleaseModalCancel = () => {
    setIsReleaseModalOpen(false);
  }
  // =======================================

  return (
    <>
      {
        isDeleteModalOpen && (
          <ConfirmationModal
            title={`Delete question?`}
            message='This action cannot be undone'
            ok='Delete'
            cancel='Cancel'
            onCancel={handleDeleteModalCancel}
            onConfirm={handleConfirmDelete}
            warning
          />
        )
      }

      {
        isReleaseModalOpen && (
          <ConfirmationModal
            title='Release exercise?'
            message='Are you sure you want to release this exercise?'
            ok='Release'
            cancel='Cancel'
            onCancel={handleReleaseModalCancel}
            onConfirm={handleConfirmRelease}
          />
        )
      }

      {
        isDeleteErrorModalOpen && (
          <ConfirmationModal
            title='Cannot delete question'
            message='Exercise must have at least 1 question.'
            ok='Ok'
            cancel=''
            onCancel={handleCloseDeleteErrorModal}
            onConfirm={handleCloseDeleteErrorModal}
            warning
          />
        )
      }
    
      <div className='flex'>
        {/* Sidebar */}
        <Sidebar active='Exercises'/>

        {/* Main content */}
        <div className='min-h-screen w-full py-5 lg:py-20 xl:py-28 pr-5 pl-28 flex flex-col gap-9 items-center'>
          
          {/* Header */}
          <div className="flex flex-col w-full max-w-[920px]">
            <Breadcrumbs urlPath={urlPath} />
            <PageTitle text='New Exercise'/>
          </div>

          {/* Exercise Form */}
          <div className="flex flex-col gap-4 w-full max-w-[920px] mb-10">
            {/* Meta */}
            <TextInput
              name='exe_name'
              value={exerciseData.exe_name}
              placeholder='Exercise name'
              label='Exercise name'
              onChange={handleExerciseInputChange}
            />
            <TextInput
              name='category'
              value={exerciseData.category}
              placeholder='Category'
              label='Category'
              onChange={handleExerciseInputChange}
            />
            <Select
              label='Difficulty'
              name='difficulty'
              value={exerciseData.difficulty}
              options={difficultyOption}
              onChange={handleExerciseSelectChange}/>
            <Select
              label='Language'
              name='language_id'
              value={exerciseData.language_id}
              options={languageOption}
              onChange={handleExerciseSelectChange}/>
          </div>

          {/* Questions Form */}
          <div className="flex flex-col gap-6 w-full max-w-[920px]">
            {
              exerciseData.questions.map((question, index) => {
                return(
                  <QuestionForm
                    number={index + 1}
                    question={question}
                    questionChange={handleQuestionTextAreaChange}
                    optionInputChange={handleOptionInputChange}
                    optionRadioChange={handleOptionRadioChange}
                    onDelete={handleDeleteQuestion}
                  />
                )
              })
            }
            <div className='w-full flex justify-center mt-9'>
              <button
                className='bg-[--orange] Poppins400 text-white px-5 py-2 rounded-md'
                onClick={handleAddQuestion}
              >
              <span className='text-lg Poppins400'>&#43;</span> Add Question
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row-reverse justify-center gap-4 w-full">
            <button
              className='Poppins400 blue-purple-button px-12 py-3 rounded-md'
              onClick={handleReleaseExercise}
            >
              Release exercise
            </button>
            <Link to='/exercise'>
              <button
                className='w-full Poppins400 bg-white border-2 border-[--red] text-[--red] px-12 py-3 rounded-md'
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;