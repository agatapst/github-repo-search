import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

export function renderWithProviders(
  component: React.ReactChild,
  route = '/'
): RenderResult & { history: MemoryHistory } {
  const history = createMemoryHistory({ initialEntries: [route] });
  const renderResult = render(<Router history={history}>{component}</Router>);
  return { ...renderResult, history };
}
