import { storiesOf } from '@kadira/storybook';
import { h } from 'preact';
import TodoItem from '../src/components/todo-item';

storiesOf('Todo Item', module).add('with text', () => {
  return <TodoItem text="pick up milk" />;
});
