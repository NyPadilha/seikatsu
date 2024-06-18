import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@primer/octicons-react';
import '../styles.scss';

const WaterCounter: React.FC = () => {
  const [bottle, setBottle] = useState<number>(500)
  const [ml, setMl] = useState<number>(200)
  const [isEditingBottle, setIsEditingBottle] = useState<boolean>(false)
  const [editBottle, setEditBottle] = useState<string>('')
  const [isEditingMl, setIsEditingMl] = useState<boolean>(false)
  const [editMl, setEditMl] = useState<string>('')
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false)
  const [editGoal, setEditGoal] = useState<string>('')
  const [drunk, setDrunk] = useState<number>(() => {
    const drunk = localStorage.getItem('drunk');
    return drunk ? JSON.parse(drunk).drunk : 0;
  });
  const [goal, setGoal] = useState<number>(() => {
    const goal = localStorage.getItem('goal');
    return goal ? JSON.parse(goal) : 2000;
  });

  const handleDCBottle = () => {
    setEditBottle(bottle.toString());
    setIsEditingBottle(true);
  }

  const handleBlurBottle = () => {
    setBottle(Number(editBottle));
    setIsEditingBottle(false);
  }

  const handleDCMl = () => {
    setEditMl(ml.toString());
    setIsEditingMl(true);
  }

  const handleBlurMl = () => {
    setMl(Number(editMl));
    setIsEditingMl(false);
  }

  const handleDCGoal = () => {
    setEditGoal(goal.toString());
    setIsEditingGoal(true);
  }

  const handleBlurGoal = () => {
    setGoal(Number(editGoal));
    setIsEditingGoal(false);
  }

  useEffect(() => {
    localStorage.setItem('drunk', JSON.stringify({ drunk, date: new Date() }));
  }, [drunk]);

  useEffect(() => {
    localStorage.setItem('goal', JSON.stringify(goal));
  }, [goal]);

  useEffect(() => {
    const storeDrunk = localStorage.getItem('drunk');

    const storedDate = new Date(storeDrunk && JSON.parse(storeDrunk).date).toISOString().split('T')[0];
    const currentDate = new Date().toISOString().split('T')[0];

    storedDate !== currentDate && setDrunk(0);
  }, []);

  return (
    <div className={drunk >= goal ? "achieved water-counter" : 'water-counter'}>
      <h1>- Water Counter -</h1>
      <section>
        <div className='plus-water'>
          {isEditingBottle ? (
            <input
              type="number"
              value={editBottle}
              onChange={(e) => setEditBottle(e.target.value)}
              onBlur={handleBlurBottle}
            />
          ) : (
            <p onDoubleClick={handleDCBottle}>
              Bottle
            </p>
          )}
          <button onClick={() => setDrunk(drunk + bottle)}><PlusIcon /></button>
        </div>
        <div className='plus-water'>
          {isEditingMl ? (
            <input
              type="number"
              value={editMl}
              onChange={(e) => setEditMl(e.target.value)}
              onBlur={handleBlurMl}
            />
          ) : (
            <p onDoubleClick={handleDCMl}>
              {`${ml}ml`}
            </p>
          )}
          <button onClick={() => setDrunk(drunk + ml)}><PlusIcon /></button>
        </div>
      </section>
      <div className="total">
        <h3>{`${drunk}ml`}</h3>
        <h3>|</h3>
        {isEditingGoal ? (
          <input
            type="number"
            value={editGoal}
            onChange={(e) => setEditGoal(e.target.value)}
            onBlur={handleBlurGoal}
          />
        ) : (
          <h3 onDoubleClick={handleDCGoal}>
            {`${goal}ml`}
          </h3>
        )}
      </div>
    </div>
  );
};

export default WaterCounter;