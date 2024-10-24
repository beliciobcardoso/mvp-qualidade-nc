import { ShowProps } from '../type'
const show: ShowProps = {
  show: 'Show1',
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 100)
}

export function Show() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">{show.show}</h1>
        <div className="flex flex-col items-center justify-center">
          <p className="text-center">{getRandomNumber()}</p>
        </div>
      </div>
    </div>
  )
}
