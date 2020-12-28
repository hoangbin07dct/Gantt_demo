import React from 'react';
import ReactDOM from 'react-dom';
import common from '../../../styles/Common.module.scss';

const Modal = ({ isShowing, hide, handleSubmit, InputChange, infoForm }) =>
  isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={common.modal_overlay} />
          <div className={common.modal_wrapper} aria-modal aria-hidden tabIndex={-1} role='dialog'>
            <div className={common.modal}>
              <div className={common.modal_header}>
                <button
                  type='button'
                  className={common.modal_close_button}
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={hide}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <form>
                <p>Task</p>
                <div>
                  <input type='text' onChange={InputChange} name='task' value={infoForm.task} />
                </div>

                <p>Type</p>
                <div>
                  <input type='text' onChange={InputChange} name='type' value={infoForm.type} />
                </div>

                <p>Start Time</p>
                <div>
                  <input type='text' onChange={InputChange} name='startTime' value={infoForm.startTime} />
                </div>
                <p>End Time</p>
                <div>
                  <input type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} />
                </div>
                <p>Details</p>
                <div>
                  <input type='text' onChange={InputChange} name='details' value={infoForm.details} />
                </div>
                <div>
                  <span onClick={handleSubmit}>Save</span>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
