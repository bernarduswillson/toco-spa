import React from 'react'

interface OptionData {
  option_id: number,
  option: string;
  is_correct: boolean;
}

interface QuestionData {
  question_id: number;
  question: string;
  options: OptionData[];
}

interface QuestionFormProps {
  number: number;
  question: QuestionData;
  questionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  optionInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  optionRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionForm = (props: QuestionFormProps) => {
  const { number, question, questionChange, optionInputChange, optionRadioChange, onDelete } = props;

  return (
    <div className='flex flex-col gap-4'>
      <label className='Poppins600 text-xs text-[--blue]'>Question {number}</label>
      <div className='flex flex-col gap-4'>
        <textarea
          className='border-2 border-gray-200 text-sm text-[--orange] Poppins400 px-3 py-2 rounded-md w-full focus:outline-none'
          rows={3}
          spellCheck={false}
          placeholder='Question prompt'
          name='question'
          value={question.question}
          questionid-key={question.question_id}
          onChange={questionChange}
        >
        </textarea>

        <div className='flex flex-col gap-2'>
          {
            question.options.map((option, i) => {
              return(
                <div className='flex gap-3 items-center' key={i}>
                  <input
                    type='radio'
                    questionid-key={question.question_id}
                    optionid-key={option.option_id}
                    name={`question${question.question_id}`}
                    value={option.option_id}
                    className='h-4 w-4 cursor-pointer appearance-none rounded-full border border-[--orange] transition-all checked:bg-[--orange]'
                    onChange={optionRadioChange}
                  />
                  <input
                    type='text'
                    questionid-key={question.question_id}
                    optionid-key={option.option_id}
                    name='option'
                    value={option.option}
                    className='w-full Poppins400 text-sm border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none'
                    placeholder={`Option ${i + 1}`}
                    onChange={optionInputChange}
                  />
                </div>
              )
            })
          }
        </div>

        <div className='w-full flex justify-end'>
          <button
            className='Poppins400 bg-[--red] text-white px-5 py-2 rounded-md'
            questionid-key={question.question_id}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionForm