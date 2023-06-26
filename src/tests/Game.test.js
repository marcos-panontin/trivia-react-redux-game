import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const mockData = {
    "response_code": 0,
    "results": [
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "easy",
            "question": "What Nationality is D.Va from Overwatch?",
            "correct_answer": "Korean",
            "incorrect_answers": [
                "Japanese",
                "Chinese",
                "Vietnamese "
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "medium",
            "question": "In the Half-Life franchise, what is the real name of the &quot;gravity gun&quot;?",
            "correct_answer": "Zero-Point Energy Field Manipulator",
            "incorrect_answers": [
                "Universal Gravity Manipulation Device",
                "Isaac Newton&#039;s Theory Disprover",
                "Quantum Energy Displacement Modifier"
            ]
        },
        {
            "category": "Entertainment: Comics",
            "type": "multiple",
            "difficulty": "easy",
            "question": "In &quot;Homestuck&quot; what is Dave Strider&#039;s guardian?",
            "correct_answer": "Bro",
            "incorrect_answers": [
                "Becquerel",
                "Doc Scratch",
                "Halley"
            ]
        },
        {
            "category": "Entertainment: Musicals & Theatres",
            "type": "boolean",
            "difficulty": "hard",
            "question": "The protagonist&#039;s names in &#039;Who&#039;s Afraid of Virginia Woolf&#039;, George and Martha, were derived from George Washington and his wife.",
            "correct_answer": "True",
            "incorrect_answers": [
                "False"
            ]
        },
        {
            "category": "Entertainment: Video Games",
            "type": "multiple",
            "difficulty": "easy",
            "question": "Which of the following was a map that was in Team Fortress 2 at launch?",
            "correct_answer": "Gravel Pit",
            "incorrect_answers": [
                "Hoodoo",
                "Gold Rush",
                "Upward"
            ]
        }
    ]
}

describe('Tests for the Game.js file', () => {
    it('Check if the header elements are present on the page', () => {
        const { history } = renderWithRouterAndRedux(<App />);
        
        act(() => {
            history.push('/game');
        });
        
        const displayName = screen.getByTestId('header-player-name');
        const displayScore = screen.getByTestId('header-score');
        const displayGravatar = screen.getByTestId('header-profile-picture');
        
        expect(displayName).toBeInTheDocument();
        expect(displayScore).toBeInTheDocument();
        expect(displayGravatar).toBeInTheDocument();
    });

    it('Check if the game page has the correct elements', async () => {
        const { history } = renderWithRouterAndRedux(<App />);
        act(() => {
            history.push('/');
        });
        
        const inputName = screen.getByTestId('input-player-name');
        const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
        const playBtn = screen.getByTestId('btn-play');
        
        act(() => {
            userEvent.type(inputName, 'correctName');
            userEvent.type(inputGravatarEmail, 'correctEmail@gmail.com');
            userEvent.click(playBtn);
        });
        
        await waitFor(() => {
            expect(history.location.pathname).toBe('/game');
        });

        jest.spyOn(global, 'fetch').mockResolvedValueOnce({
            json: jest.fn().mockResolvedValue(mockData),
          });
        
        const displayQuestionCategory = await screen.findByTestId('question-category');
        const displayQuestionText = screen.getByTestId('question-text');
        const displayAnswerOptions = screen.getByTestId('answer-options');
        const displayTimer = screen.getByTestId('timer');

        await waitFor(() => {
        expect(displayAnswerOptions).toBeInTheDocument();
        expect(displayTimer).toBeInTheDocument();
        expect(displayQuestionCategory).toBeInTheDocument();
        expect(displayQuestionText).toBeInTheDocument();
        });
    });
    it('Check if the timer stoped', async () => {
        // const { history } = renderWithRouterAndRedux(<App />);
        // act(() => {
        //     history.push('/');
        // });
        
        // const inputName = screen.getByTestId('input-player-name');
        // const inputGravatarEmail = screen.getByTestId('input-gravatar-email');
        // const playBtn = screen.getByTestId('btn-play');
        
        // act(() => {
        //     userEvent.type(inputName, 'correctName');
        //     userEvent.type(inputGravatarEmail, 'correctEmail@gmail.com');
        //     userEvent.click(playBtn);
        // });
        
        // await waitFor(() => {
        //     expect(history.location.pathname).toBe('/game');
        // });

        // jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        //     json: jest.fn().mockResolvedValue(mockData),
        // });
    });
});