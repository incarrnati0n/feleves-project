import { useEffect, useState } from "react";
import axios from "axios";
import GuestLogItem from "./GuestLogItem";
import { Box, Button, Typography } from "@mui/material"; // Material UI imports

interface GuestLogProps {
  reload: number;
}

export default function GuestLog({ reload }: GuestLogProps) {
  const [items, setItems] = useState<any[]>([]); // Initialize with an empty array, not null
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    readLogs();
  }, [reload]);

  function readLogs() {
    axios
      .get("/readLogs")
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data || []); // Ensure that `items` is an array, even if `res.data` is null
        } else {
          console.log("Error: items couldn't be fetched!");
        }
      })
      .catch((err) => {
        console.log(`Error fetching data: ${err}`);
      });
  }

  // Ensure items are not null or empty before slicing
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    items.length > 0
      ? items.slice(indexOfFirstItem, indexOfLastItem).reverse()
      : [];

  // Pagination controls
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <Box sx={{ padding: 2 }}>
      {/* If no logs, show a fallback message */}
      {items.length === 0 ? (
        <Typography variant="h6" align="center">
          No logs available.
        </Typography>
      ) : (
        <>
          {/* Display the current guest log items */}
          {currentItems.map((item) => (
            <GuestLogItem key={item._id} item={item} />
          ))}

          {/* Pagination Controls using Material UI */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              sx={{ marginRight: 2 }}
            >
              Previous
            </Button>

            <Typography variant="body1">
              Page {currentPage} of {totalPages}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              sx={{ marginLeft: 2 }}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
