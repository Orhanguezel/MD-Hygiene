
// src/App.js
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

function Counter() {
  const {count} = useSelector((store) => store.counter); // ✅ State’i almak için useSelector hook’u
  const dispatch = useDispatch(); // ✅ Dispatch hook’u

  return (
    <div>
      <button onClick={() => dispatch(increment())}>{count}</button>
      <button onClick={() => dispatch(decrement())}>{count}</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>{count}</button>
    </div>
  );
}

export default Counter;