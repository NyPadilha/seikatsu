import React, { useContext } from 'react';
import { WatchlistContext } from '../../context/useContext';
import { updateTag } from '../../services/api';
import { Tag } from '../../types/IWatchlist';
import '../../styles.scss';

interface TagModalProps {
  url: string;
}

const TagModal: React.FC<TagModalProps> = ({ url }) => {
  const { setIsTagModalOpen } = useContext(WatchlistContext);
  const { setTagChanged } = useContext(WatchlistContext);

  const handleUpdate = async (url: string, tag: Tag) => {
    await updateTag(url, tag);
    setTagChanged({ url, tag });
    setIsTagModalOpen(false);
  }

  const handleClose = () => {
    setIsTagModalOpen(false);
  }

  return (
    <div className='tag-modal'>
      <button onClick={() => handleClose()} className='x-button'></button>
      <section>
        <div>
          <h1>- Alone -</h1>
          <button onClick={() => handleUpdate(url, "sunday")}>Sunday</button>
          <button onClick={() => handleUpdate(url, "monday")}>Monday</button>
          <button onClick={() => handleUpdate(url, "tuesday")}>Tuesday</button>
          <button onClick={() => handleUpdate(url, "wednesday")}>Wednesday</button>
          <button onClick={() => handleUpdate(url, "thursday")}>Thursday</button>
          <button onClick={() => handleUpdate(url, "friday")}>Friday</button>
          <button onClick={() => handleUpdate(url, "saturday")}>Saturday</button>
        </div>
        <div>
          <h1>- Together -</h1>
          <button onClick={() => handleUpdate(url, "sun")}>Sunday</button>
          <button onClick={() => handleUpdate(url, "mon")}>Monday</button>
          <button onClick={() => handleUpdate(url, "tue")}>Tuesday</button>
          <button onClick={() => handleUpdate(url, "wed")}>Wednesday</button>
          <button onClick={() => handleUpdate(url, "thu")}>Thursday</button>
          <button onClick={() => handleUpdate(url, "fri")}>Friday</button>
          <button onClick={() => handleUpdate(url, "sat")}>Saturday</button>
        </div>
      </section>
      <button onClick={() => handleUpdate(url, "new_season")} className='new-season'>New Season</button>
      <button onClick={() => handleUpdate(url, "untagged")}>Untagged</button>
    </div>
  );
};

export default TagModal;