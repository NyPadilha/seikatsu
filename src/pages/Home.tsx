import 'react';
import '../styles.scss'

export default function Home() {
  return (
    <section id='homepage'>
      <div className='banner'>PlaceHolder</div>
      <section className='top'>
        <div className='time-progress'>
          <iframe
            src="https://indify.co/widgets/live/progressBar/OGDIEMrNCVgIdbGcwx3B"
            className='progress-bar'
          />
        </div>
        <div className='profile'></div>
      </section>
      <section className='content'>
        <section className='first-section'>
          <div className='skills'>
            <h1>Skills</h1>
            <div className='skills-graphic'>PlaceHolder</div>
          </div>
          <div className='central'>
            <h1>Central</h1>
            <section className='central-content'>
              <div className='card'></div>
              <div className='card'></div>
              <div className='card'></div>
              <div className='card'></div>
              <div className='card'></div>
              <div className='card'></div>
              <div className='card'></div>
              <div className='card'></div>
            </section>
          </div>
        </section>
        <section className='second-section'>
          <h1>- Habitos -</h1>
        </section>
        <section className='third-section'>
          <h1>- Shop -</h1>
        </section>
      </section>
    </section>
  );
}
