import React, { useEffect, useState } from 'react';
import { deleteCategory, updateCategoryName } from '../../services/api';
import { Category } from '../../types/IFinance';

interface CategoryRowProps {
  category: Category;
  onDelete: (name: string) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, onDelete }) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [isEditingCategory, setIsEditingCategory] = useState<boolean>(false);

  const deleteRow = async () => {
    await deleteCategory(categoryName);
    onDelete(categoryName);
  }

  const handleCategoryBlur = async () => {
    setIsEditingCategory(false);
    await updateCategoryName(category.name, categoryName);
    setCategoryName(categoryName);
  }

  const categoryKeyPress = async ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Enter') {
      handleCategoryBlur();
    }
  }

  useEffect(() => {
    setCategoryName(category.name);
  }, []);

  return (
    <div className='row'>
      {isEditingCategory ? (
        <input
          type='text'
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          onBlur={handleCategoryBlur}
          onKeyDown={categoryKeyPress}
          autoFocus
        />
      ) : (
        <h2
          onDoubleClick={() => setIsEditingCategory(true)}
        >
          {categoryName}
        </h2>
      )}
      <p
        className='x-button'
        onClick={deleteRow}
      ></p>
    </div>
  );
};

export default CategoryRow;