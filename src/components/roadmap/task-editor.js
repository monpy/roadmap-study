import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Store } from "../../states/project";
import Resizable from "re-resizable";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const TaskEditor = ({ task, show, onClose }) => {
  const [isShow, updateIsShow] = useState(show);
  const titleInput = useRef(null);
  const willSpentHourInput = useRef(null);

  useEffect(() => {
    updateIsShow(show);
  }, [show]);

  if (!task) return null;

  return (
    <Modal
      open={isShow}
      onClose={() => {
        updateIsShow(false);
        onClose({ cancel: true });
      }}
    >
      <MocalContaier>
        <ModalContent>
          <h2
            style={{
              fontFamily: "Inter-UI-Regular, Arial, Roboto, sans-serif"
            }}
          >
            Task Edit
          </h2>
          <h4 style={{ marginBottom: 4 }}>Title</h4>
          <Input
            inputRef={titleInput}
            defaultValue={task.title}
            fullWidth={true}
            placeholder="Type task name"
          />
          <h4 style={{ marginBottom: 4 }}>Will Spent Hours</h4>
          <Input
            type="number"
            inputRef={willSpentHourInput}
            defaultValue={task.willSpentHour}
            fullWidth={true}
            placeholder="Type hours"
          />
          <div style={{ textAlign: "right", marginTop: 20 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                updateIsShow(false);
                onClose({
                  cancel: false,
                  value: Object.assign({}, task, {
                    title: titleInput.current.value,
                    willSpentHour: willSpentHourInput.current.value
                  })
                });
              }}
            >
              Submit
            </Button>
          </div>
        </ModalContent>
      </MocalContaier>
    </Modal>
  );
};

const MocalContaier = styled.div`
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  padding: 8px;
  border-radius: 12px;
  background-color: #fff;
  max-width: 800px;
  width: 80%;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

export default TaskEditor;
