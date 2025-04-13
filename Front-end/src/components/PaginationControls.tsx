import React from "react";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  prevText?: string;
  nextText?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalPages,
  setPage,
  prevText = "Anterior",
  nextText = "Próxima",
}) => {
  return (
    <div className="d-flex justify-content-center align-items-center my-4">
      <button
        className="btn btn-outline-primary me-2"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        <i className="fas fa-chevron-left"></i> {prevText}
      </button>

      <span>
        Página {page + 1} de {totalPages}
      </span>

      <button
        className="btn btn-outline-primary ms-2"
        onClick={() => setPage(page + 1)}
        disabled={page + 1 >= totalPages}
      >
        {nextText} <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default PaginationControls;