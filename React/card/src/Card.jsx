import pic from './assets/hero.png'

function Card() {
  return (
    <div className="card">
      <img className="card-pic" src={pic} alt="profile picture" />
      <h2 className="card-title">Pranay</h2>
      <p className='card-text'>Lets make some art, nga stop larpin and boot the pc alr</p>
    </div>
  );
}

export default Card;
