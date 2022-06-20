type SquareProps = {
  value: string
  onClick: Function
}

function Square(props: SquareProps) {
  return (
    <button
      className="square"
      onClick={() => props.onClick('X')}
    >
      {props.value}
    </button>
  )
}

export default Square;