import { Input } from '@/components/Input/Input';
import { Modal } from '@/components/Modal/Modal';
import block from 'bem-cn';

import Button from '@/components/Button/Buttons';
import { categories, order, priorities, sortBy } from './utils';

import cls from './FiltersModal.module.scss';
import useFilters from './useFilters';

interface IFiltersModal {
  model: ReturnType<typeof useFilters>;
}

const b = block(cls.filtersModal);

const FiltersModal = ({ model }: IFiltersModal) => {
  const { isOpen } = model;

  return (
    <Modal isOpen={isOpen} onClose={() => model.handleCloseFilters()}>
      <div>Фильтры</div>
      <form className={b('form')} onSubmit={(e) => model.handleSendFilters(e)}>
        <div className={b('input')}>
          <Input
            key={model.sortOrder.priority}
            placeholder="Приоритет"
            type="select"
            value={model.sortOrder.priority || null}
            options={priorities}
            onChange={(e) =>
              model.handleChangeFilters(e.target.value, 'priority')
            }
          />
        </div>
        <div className={b('input')}>
          <Input
            key={model.sortOrder.category}
            placeholder="Категория"
            type="select"
            value={model.sortOrder.category || null}
            options={categories}
            onChange={(e) =>
              model.handleChangeFilters(e.target.value, 'category')
            }
          />
        </div>
        <div className={b('input')}>
          <Input
            key={model.sortOrder.sortBy}
            placeholder="Сортировать по"
            type="select"
            value={model.sortOrder.sortBy || null}
            options={sortBy}
            onChange={(e) =>
              model.handleChangeFilters(e.target.value, 'sortBy')
            }
          />
        </div>
        <div className={b('input', 'last')}>
          <Input
            key={model.sortOrder.order}
            placeholder="По"
            type="select"
            value={model.sortOrder.order || null}
            options={order}
            onChange={(e) => model.handleChangeFilters(e.target.value, 'order')}
          />
        </div>
        <div className={b('buttons')}>
          <div className={b('button-submit')}>
            <Button type="submit">Применить фильтры</Button>
          </div>
          <div className={b('button-submit')}>
            <Button onClick={(e) => model.handleRefreshFilters(e)}>
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default FiltersModal;
