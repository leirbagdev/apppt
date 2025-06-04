import type React from "react"
import { Box, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import WatchIcon from "@mui/icons-material/Watch"
import SmartphoneIcon from "@mui/icons-material/Smartphone"
import BluetoothIcon from "@mui/icons-material/Bluetooth"
import BluetoothDisabledIcon from "@mui/icons-material/BluetoothDisabled"

const StatusContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  borderRadius: "12px",
  backgroundColor: "var(--surface-variant)",
  border: "1px solid var(--outline-variant)",
})

const getDeviceIcon = (wearable: string) => {
  if (wearable.toLowerCase().includes("smartphone") || wearable.toLowerCase().includes("fit")) {
    return <SmartphoneIcon sx={{ fontSize: 16 }} />
  }
  return <WatchIcon sx={{ fontSize: 16 }} />
}

interface WearableStatusProps {
  wearable: string
  connected: boolean
  className?: string
  sx?: any
}

const WearableStatus: React.FC<WearableStatusProps> = ({ wearable, connected, className, sx }) => {
  return (
    <StatusContainer className={className} sx={sx}>
      {getDeviceIcon(wearable)}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "var(--on-surface)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {wearable}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {connected ? (
          <BluetoothIcon sx={{ fontSize: 14, color: "var(--success)" }} />
        ) : (
          <BluetoothDisabledIcon sx={{ fontSize: 14, color: "var(--error)" }} />
        )}
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.7rem",
            color: connected ? "var(--success)" : "var(--error)",
            fontWeight: 500,
          }}
        >
          {connected ? "Conectado" : "Desconectado"}
        </Typography>
      </Box>
    </StatusContainer>
  )
}

export default WearableStatus
