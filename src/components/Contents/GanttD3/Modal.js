import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import modal from '../../../styles/Modal.module.scss';
import Datetime from 'react-datetime';
import { v4 as uuidv4 } from 'uuid';

const Modal = (props) => {
  const [infoForm, setInfoForm] = useState({
    id: uuidv4(),
    isShow: true,
    task: '',
    type: '',
    startTimeCurrent: '', //year/month/day
    endTimeCurrent: '',
    startTimePlan: '', //year/month/day
    endTimePlan: '',
    startTimeInitialPlan: '', //year/month/day
    endTimeInitialPlan: '',
    details: '',
    progress: 50,
    level: 1,
    hasChild: false,
    collapsed: false,
    isTimePlanUpdated: false,
    dependence: [],
  });
  let allGroup = new Set(props.data.map((item) => item.type));
  const [modalContext, setModalContext] = useState({
    handleSubmit: null,
    handleDelete: null,
    modalTitle: null,
    submitText: null,
  });

  useEffect(() => {
    if (props.modal.contextId) {
      const index = props.data.findIndex((el) => el.id === props.modal.contextId);
      if (props.modal.type === 'create') {
        setInfoForm({
          ...infoForm,
          type: props.data[index].type,
          level: props.data[index].level + 1,
        });
      }
      if (props.modal.type === 'update') {
        setInfoForm({
          ...props.data[index],
        });
      }
    }
    if (props.modal.type === 'create') {
      setModalContext({
        handleSubmit: props.handleCreateTask,
        modalTitle: 'Add New Task',
        submitText: 'Add',
      });
    }
    if (props.modal.type === 'update') {
      setModalContext({
        handleSubmit: props.handleUpdateTask,
        modalTitle: 'Update Task',
        submitText: 'Update',
        handleDelete: props.handleDeleteTask,
      });
    }
  }, []);

  const InputChange = (e) => {
    if (e.target.name === 'progress') {
      if (e.target.value > 100) {
        e.target.value = 100;
      }
      if (e.target.value < 0) {
        e.target.value = 0;
      }
    }
    setInfoForm({
      ...infoForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeTime = (e, type) => {
    setInfoForm({
      ...infoForm,
      [type]: e.format('YYYY-MM-DD'),
    });
  };

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className={modal.modal_overlay} />
      <div className={modal.modal_wrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className={modal.modal}>
          <div className={modal.modal_header}>
            <button
              type="button"
              className={modal.modal_close_button}
              data-dismiss="modal"
              aria-label="Close"
              onClick={(e) => props.toggleModal(e)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
            <h3 className={modal.form_ttl}>{modalContext.modalTitle}</h3>
            <p>Task</p>
            <div>
              <input className={modal.ip} type="text" onChange={InputChange} name="task" value={infoForm.task} />
            </div>
            <div className={modal.dateGroup}>
              <div className={modal.flexItem}>
                <p>Type</p>
                <div>
                  <input
                    className={modal.ip}
                    type="text"
                    onChange={!props.modal.contextId ? InputChange : undefined}
                    name="type"
                    value={infoForm.type}
                    readOnly={!!props.modal.contextId}
                    list="type-options"
                  />
                  <datalist id="type-options">
                    {Array.from(allGroup).map((el, key) => (
                      <option key={key}>{el}</option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className={modal.flexItem}>
                <p>
                  Progress
                  <input
                    className={modal.inputSlider}
                    type="number"
                    onChange={InputChange}
                    name="progress"
                    value={infoForm.progress}
                  />
                  %
                </p>
                <div>
                  <input
                    className={modal.slider}
                    type="range"
                    min="0"
                    max="100"
                    onChange={InputChange}
                    name="progress"
                    value={infoForm.progress}
                  />
                </div>
              </div>
            </div>

            <div className={modal.dateGroup}>
              <div className={modal.flexItem}>
                <p>Start Time Current</p>
                <div className={modal.dateItem}>
                  <Datetime
                    // ref={dateFromRef}
                    locale="ja-JP"
                    value={infoForm.startTimeCurrent}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    onChange={(e) => handleChangeTime(e, 'startTimeCurrent')}
                    closeOnSelect={true}
                    className={modal.time}
                  />
                </div>
              </div>
              <div className={modal.flexItem}>
                <p>End Time Current</p>
                <div className={modal.dateItem}>
                  <Datetime
                    // ref={dateFromRef}
                    locale="ja-JP"
                    value={infoForm.endTimeCurrent}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    onChange={(e) => handleChangeTime(e, 'endTimeCurrent')}
                    closeOnSelect={true}
                    className={modal.time}
                  />
                </div>
              </div>
            </div>
            <div className={modal.dateGroup}>
              <div className={modal.flexItem}>
                <p>Start Time Plan</p>
                <div className={modal.dateItem}>
                  {/* <input className={modal.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} /> */}
                  <Datetime
                    // ref={dateFromRef}
                    locale="ja-JP"
                    value={infoForm.startTimePlan}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    onChange={(e) => handleChangeTime(e, 'startTimePlan')}
                    closeOnSelect={true}
                    className={modal.time}
                  />
                </div>
              </div>
              <div className={modal.flexItem}>
                <p>End Time Plan</p>
                <div className={modal.dateItem}>
                  {/* <input className={modal.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} /> */}
                  <Datetime
                    // ref={dateFromRef}
                    locale="ja-JP"
                    value={infoForm.endTimePlan}
                    dateFormat="YYYY-MM-DD"
                    timeFormat={false}
                    onChange={(e) => handleChangeTime(e, 'endTimePlan')}
                    closeOnSelect={true}
                    className={modal.time}
                  />
                </div>
              </div>
            </div>
            {/* <p>Start Time Initial Plan</p>
            <div>
              //<input className={modal.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} />
              <Datetime
                // ref={dateFromRef}
                locale="ja-JP"
                value={infoForm.endTime}
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                onChange={(e) => getStartTimeInitialPlan(e)}
                closeOnSelect={true}
                className={modal.time}
              />
            </div>
            <p>End Time Initial Plan</p>
            <div>
              //<input className={modal.ip} type='text' onChange={InputChange} name='endTime' value={infoForm.endTime} />
              <Datetime
                // ref={dateFromRef}
                locale="ja-JP"
                value={infoForm.endTime}
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                onChange={(e) => getEndTimeInitialPlan(e)}
                closeOnSelect={true}
                className={modal.time}
              />
            </div> */}
            <p>Details</p>
            <div>
              <textarea className={modal.textarea} onChange={InputChange} name="details" value={infoForm.details} />
            </div>
            <div className={modal.btn_list}>
              {!!modalContext.handleDelete && (
                <span
                  className={`${modal.form_btn} ${modal.delete_btn}`}
                  onClick={(e) => {
                    modalContext.handleDelete(e, props.modal.contextId);
                  }}>
                  Delete
                </span>
              )}
              <span
                className={modal.form_btn}
                onClick={(e) => {
                  modalContext.handleSubmit(e, infoForm, props.modal.contextId);
                }}>
                {modalContext.submitText}
              </span>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>,
    document.body
  );
};

export default Modal;
