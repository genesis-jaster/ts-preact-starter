import { storiesOf } from '@storybook/react';
import { h } from 'preact';
import TodoItem from '../todo-item';

declare var module;

storiesOf('Todo Item', module)
  .add('with text', () => {

    return (
      <TodoItem
        text="pick up milk"
        />
    );
  });
