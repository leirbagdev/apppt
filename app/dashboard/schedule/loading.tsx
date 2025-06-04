"use client"

import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

export default function ScheduleLoading() {
  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", p: 3 }}>
      {/* Header skeleton */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Skeleton variant="circular" width={48} height={48} sx={{ backgroundColor: "#333333" }} />
          <Skeleton variant="text" width={300} height={40} sx={{ backgroundColor: "#333333" }} />
          <Skeleton variant="circular" width={48} height={48} sx={{ backgroundColor: "#333333" }} />
        </Box>
        <Skeleton variant="rounded" width={200} height={48} sx={{ backgroundColor: "#333333" }} />
      </Box>

      {/* Content skeleton */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {[1, 2, 3, 4].map((item) => (
          <Card
            key={item}
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Skeleton variant="circular" width={48} height={48} sx={{ backgroundColor: "#333333" }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" width="60%" height={24} sx={{ backgroundColor: "#333333", mb: 1 }} />
                  <Skeleton variant="text" width="40%" height={20} sx={{ backgroundColor: "#333333" }} />
                </Box>
                <Skeleton variant="rounded" width={80} height={24} sx={{ backgroundColor: "#333333" }} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
