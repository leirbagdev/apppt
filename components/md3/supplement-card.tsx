"use client"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import { motion } from "framer-motion"

// Icons
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import InfoIcon from "@mui/icons-material/Info"

interface SupplementCardProps {
  name: string
  timing: string
  dosage: string
  purpose: string
  instructions: string
  onEdit?: () => void
  onDelete?: () => void
  onInfo?: () => void
}

export default function SupplementCard({
  name,
  timing,
  dosage,
  purpose,
  instructions,
  onEdit,
  onDelete,
  onInfo,
}: SupplementCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        height: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {name}
            </Typography>
            <Chip label={timing} size="small" color="primary" sx={{ borderRadius: 3 }} />
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" onClick={onInfo} sx={{ color: "info.main" }}>
              <InfoIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onEdit} sx={{ color: "primary.main" }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onDelete} sx={{ color: "error.main" }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <List disablePadding>
          <ListItem disablePadding sx={{ py: 1 }}>
            <ListItemText
              primary="Dosagem"
              secondary={dosage}
              primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }}
              secondaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ py: 1 }}>
            <ListItemText
              primary="Finalidade"
              secondary={purpose}
              primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }}
              secondaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
          <Divider />
          <ListItem disablePadding sx={{ py: 1 }}>
            <ListItemText
              primary="Instruções"
              secondary={instructions}
              primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }}
              secondaryTypographyProps={{ variant: "body2" }}
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}
