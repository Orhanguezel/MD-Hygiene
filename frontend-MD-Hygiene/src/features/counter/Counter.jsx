
// src/App.js
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from './features/counter/counterSlice';

function Counter() {
  const dispatch = useDispatch(); // ✅ Dispatch hook’u

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default Counter;