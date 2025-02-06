import { Routes, Route} from "react-router-dom";
import NotFound from "../components/common/NotFound";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default UserRoutes;
