export type submitTpl = 'userError' | 'noError' | 'pending' | 'submit' | 'computationError';
export type computationState = 'computationError' | 'pending' | 'submit' | null;

export const stateCalculator: { [key in submitTpl]: (userErr: boolean, computationState: computationState) => submitTpl } = {
  userError: (userErr: boolean) => (userErr ? 'userError' : 'noError'),
  noError: (userErr: boolean, computationState: computationState) => (computationState === 'pending' ? 'pending' : userErr ? 'userError' : 'noError'),
  pending: (userErr: boolean, computationState: computationState) => computationState as submitTpl,
  submit: (userErr: boolean, computationState: computationState) => (computationState === 'pending' ? 'pending' : userErr ? 'userError' : 'noError'),
  computationError: (userErr: boolean, computationState: computationState) =>
    computationState === 'pending' ? 'pending' : userErr ? 'userError' : 'noError',
};
