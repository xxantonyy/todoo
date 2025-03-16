import { Input, Textarea } from '@/components/Input/Input';
import { Modal } from '@/components/Modal/Modal';
import block from 'bem-cn';

import cls from './ToDoModal.module.scss';
import { getNotify } from '@/components/Notify/Notify';
import { useEffect } from 'react';
import Button from '@/components/Button/Buttons';
import useCreateModal from './model';
import { categories, priorities } from './utils';

interface IToDoModal {
  model: ReturnType<typeof useCreateModal>;
}

const b = block(cls.todoModal);

const ToDoModal = ({ model }: IToDoModal) => {
  const { isOpen, isCreateTask, isPatch } = model;

  return (
    <Modal isOpen={isOpen} onClose={() => model.handleCloseModal()}>
      {isPatch ? <div>Update Task</div> : <div>Create a new task</div>}
      <form className={b('form')} onSubmit={(e) => model.handleCreateTask(e)}>
        <div className={b('input')}>
          <Input
            placeholder="title"
            value={model.taskState.title}
            onChange={(e) => model.handleChangeTask(e.target.value, 'title')}
          />
        </div>
        <div className={b('input')}>
          <Textarea
            className={'textarea'}
            placeholder="description"
            value={model.taskState.description}
            onChange={(e) =>
              model.handleChangeTask(e.target.value, 'description')
            }
          />
        </div>
        {/* <div className={b('input')}>
          <div className={b('checkbox')}>
            <Input
              placeholder="completed"
              type="checkbox"
              checked={model.taskState.completed}
              onChange={(e) =>
                model.handleChangeTask(e.target.checked, 'completed')
              }
            />
            <div>completed</div>
          </div>
        </div> */}
        <div className={b('input')}>
          <Input
            placeholder="priority"
            type="select"
            value={model.taskState.priority}
            options={priorities}
            onChange={(e) => model.handleChangeTask(e.target.value, 'priority')}
          />
        </div>
        <div className={b('input', 'last')}>
          <Input
            placeholder="category"
            type="select"
            value={model.taskState.category}
            options={categories}
            onChange={(e) => model.handleChangeTask(e.target.value, 'category')}
          />
        </div>
        <div className={b('button-submit')}>
          {isPatch && (
            <Button onClick={(e) => model.handlePatchTask(e)}>Patch</Button>
          )}
          {isCreateTask && <Button type="submit">Create new task</Button>}
          {!isCreateTask && (
            <Button
              className="delete"
              onClick={(e) => model.handleDeleteTask(e, model.taskState.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ToDoModal;
