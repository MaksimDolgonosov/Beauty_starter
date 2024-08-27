import "./modal.scss";

interface ICancelProps {
	toggleModal: (state: boolean) => void,
	selectedId: number
}

function CancelModal({ toggleModal, selectedId }: ICancelProps) {
	return (
		<div className="modal">
			<div className="modal__body">
				<span className="modal__title">
					Are you sure you want to delete the appointment? #{selectedId}
				</span>
				<div className="modal__btns">
					<button className="modal__ok">Ok</button>
					<button className="modal__close" onClick={() => toggleModal(false)}>Close</button>
				</div>
				<div className="modal__status">Success</div>
			</div>
		</div>
	);
}

export default CancelModal;
