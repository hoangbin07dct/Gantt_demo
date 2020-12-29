import React from 'react';
import ReactDOM from 'react-dom';
import common from '../../../styles/Common.module.scss';
import Datetime from 'react-datetime';

const Modal = ({
  isShowing,
  hide,
  handleSubmit,
  InputChange,
  infoForm,
  getStartTimeCurrent,
  getEndTimeCurrent,
  getStartTimePlan,
  getEndTimePlan,
  getStartTimeInitialPlan,
  getEndTimeInitialPlan,
}) =>
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
                <h3 className={common.form_ttl}>Add New Task</h3>
                <p>Task</p>
                <div>
                  <input className={common.ip} type='text' onChange={InputChange} name='task' value={infoForm.task} />
                </div>

                <p>Type</p>
                <div>
                  <input className={common.ip} type='text' onChange={InputChange} name='type' value={infoForm.type} />
                </div>

                <p>Start Time Current</p>
                <div>
                  <Datetime
                    // ref={dateFromRef}
                    locale='ja-JP'
                    value={infoForm.startTimeCurrent}
                    dateFormat='YYYY-MM-DD'
                    timeFormat={false}
                    onChange={(e) => getStartTimeCurrent(e)}
                    closeOnSelect={true}
                    className={common.time}
                  />
                </div>
                <p>End Time Current</p>
                <div>
                  {/* <input className={common.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} /> */}
                  <Datetime
                    // ref={dateFromRef}
                    locale='ja-JP'
                    value={infoForm.endTime}
                    dateFormat='YYYY-MM-DD'
                    timeFormat={false}
                    onChange={(e) => getEndTimeCurrent(e)}
                    closeOnSelect={true}
                    className={common.time}
                  />
                </div>
                <p>Start Time Plan</p>
                <div>
                  {/* <input className={common.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} /> */}
                  <Datetime
                    // ref={dateFromRef}
                    locale='ja-JP'
                    value={infoForm.endTime}
                    dateFormat='YYYY-MM-DD'
                    timeFormat={false}
                    onChange={(e) => getStartTimePlan(e)}
                    closeOnSelect={true}
                    className={common.time}
                  />
                </div>
                <p>End Time Plan</p>
                <div>
                  {/* <input className={common.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} /> */}
                  <Datetime
                    // ref={dateFromRef}
                    locale='ja-JP'
                    value={infoForm.endTime}
                    dateFormat='YYYY-MM-DD'
                    timeFormat={false}
                    onChange={(e) => getEndTimePlan(e)}
                    closeOnSelect={true}
                    className={common.time}
                  />
                </div>
                <p>Start Time Initial Plan</p>
                <div>
                  {/* <input className={common.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} /> */}
                  <Datetime
                    // ref={dateFromRef}
                    locale='ja-JP'
                    value={infoForm.endTime}
                    dateFormat='YYYY-MM-DD'
                    timeFormat={false}
                    onChange={(e) => getStartTimeInitialPlan(e)}
                    closeOnSelect={true}
                    className={common.time}
                  />
                </div>
                <p>End Time Initial Plan</p>
                <div>
                  {/* <input className={common.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} /> */}
                  <Datetime
                    // ref={dateFromRef}
                    locale='ja-JP'
                    value={infoForm.endTime}
                    dateFormat='YYYY-MM-DD'
                    timeFormat={false}
                    onChange={(e) => getEndTimeInitialPlan(e)}
                    closeOnSelect={true}
                    className={common.time}
                  />
                </div>
                <p>Details</p>
                <div>
                  <input
                    className={common.ip}
                    type='text'
                    onChange={InputChange}
                    name='details'
                    value={infoForm.details}
                  />
                </div>
                <p>Progress</p>
                <div>
                  <input
                    className={common.ip}
                    type='text'
                    onChange={InputChange}
                    name='progress'
                    value={infoForm.progress}
                  />
                </div>
                <div>
                  <span className={common.form_btn} onClick={handleSubmit}>
                    Add
                  </span>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;

export default Modal;
