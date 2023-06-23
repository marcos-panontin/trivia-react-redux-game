import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do arquivo Feedback.js', () => {

  it('Verifica se os elementos corretos estão presentes na página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const profilePicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const playerScore = screen.getByTestId('header-score');
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
  });


});
