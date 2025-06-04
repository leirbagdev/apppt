"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Slide,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { styled } from "@mui/material/styles"

interface Student {
  id: string
  name: string
  avatarUrl: string
}

interface MobileStudentSelectorProps {
  open: boolean
  onClose: () => void
  students: Student[]
  selectedStudentId: string | null
  onStudentSelect: (studentId: string) => void
}

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
})

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "20px 20px 0 0", // Updated borderRadius
  width: "100%",
  maxWidth: "600px",
  padding: theme.spacing(2),
  outline: "none",
}))

const StyledList = styled(List)({
  padding: 0,
})

const StyledListItem = styled(ListItem)({
  borderRadius: "12px", // Updated borderRadius
  marginBottom: "8px",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
})

const StyledAvatar = styled(Avatar)({
  borderRadius: "10px", // Updated borderRadius
  width: 40,
  height: 40,
})

const MobileStudentSelector: React.FC<MobileStudentSelectorProps> = ({
  open,
  onClose,
  students,
  selectedStudentId,
  onStudentSelect,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const handleStudentClick = (studentId: string) => {
    onStudentSelect(studentId)
    onClose()
  }

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          transition: "background-color 0.3s ease", // Updated transition
        },
      }}
      ref={modalRef}
    >
      <Slide direction="up" in={isMounted && open} mountOnEnter unmountOnExit container={modalRef.current}>
        <StyledBox>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" component="h2">
              Select Student
            </Typography>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <StyledList>
            {students.map((student) => (
              <StyledListItem
                button
                key={student.id}
                onClick={() => handleStudentClick(student.id)}
                selected={student.id === selectedStudentId}
              >
                <ListItemAvatar>
                  <StyledAvatar alt={student.name} src={student.avatarUrl} />
                </ListItemAvatar>
                <ListItemText primary={student.name} />
              </StyledListItem>
            ))}
          </StyledList>
        </StyledBox>
      </Slide>
    </StyledModal>
  )
}

export default MobileStudentSelector
