import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export function renderWithProviders(component: React.ReactChild, route = '/'): RenderResult {
  const history = createMemoryHistory({ initialEntries: [route] });
  return render(<Router history={history}>{component}</Router>);
}
