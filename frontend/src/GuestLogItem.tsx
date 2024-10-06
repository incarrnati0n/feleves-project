import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

interface GuestLogItemProps {
  item: {
    name: string;
    log: string;
    date: string;
  };
}

export default function GuestLogItem({ item }: GuestLogItemProps) {
  return (
    <Box my={2}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {item.log}
          </Typography>

          <Typography
            variant="caption"
            display="block"
            color="textSecondary"
            sx={{ mt: 1 }}
          >
            {item.date}
          </Typography>

          {/* Divider instead of <hr /> */}
          <Divider sx={{ mt: 2, width: "50%", mx: "auto" }} />
        </CardContent>
      </Card>
    </Box>
  );
}
