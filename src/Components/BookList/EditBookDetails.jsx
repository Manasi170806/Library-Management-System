import { useParams } from "react-router-dom";

function EditBookDetails() {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit Book {id}</h2>
    </div>
  );
}

export default EditBookDetails;
