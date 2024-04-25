import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const invoices = [
    // {
    //   invoice: "INV001",
    //   paymentStatus: "Paid",
    //   totalAmount: "$250.00",
    //   paymentMethod: "Credit Card",
    // },
    // {
    //   invoice: "INV002",
    //   paymentStatus: "Pending",
    //   totalAmount: "$150.00",
    //   paymentMethod: "PayPal",
    // },
    // {
    //   invoice: "INV003",
    //   paymentStatus: "Unpaid",
    //   totalAmount: "$350.00",
    //   paymentMethod: "Bank Transfer",
    // },
    {
        id: 1,
        username: "user1",
        document: "document1.jpg",
        status: "pending",
    },
    {
        id: 2,
        username: "user2",
        document: "document2.jpg",
        status: "pending",
    },
    {
        id: 3,
        username: "user3",
        document: "document3.jpg",
        status: "pending",
    },
    {
        id: 4,
        username: "user4",
        document: "document4.jpg",
        status: "rejected",
    },
    {
        id: 5,
        username: "user5",
        document: "document5.jpg",
        status: "rejected",
    },
    
  ]

  
  
  export default function RequestTables() {

    const [requests, setRequests] = useState([]);
    const handleVerify = (requestId: number, status: string) => {
        const updatedRequests = requests.map((request) =>
            request.id === requestId ? { ...request, status } : request
        );
        setRequests(updatedRequests);
    };
    return (
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Document</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{invoice.username}</TableCell>
              <TableCell>{invoice.document}</TableCell>
              <TableCell className="text-right">{invoice.status}</TableCell>
                <TableCell className="text-right">
                
										<button
											onClick={() =>
												handleVerify(
													request.id,
													"approved"
												)
											}
										>
											Approve
										</button>
										<button
											onClick={() =>
												handleVerify(
													request.id,
													"rejected"
												)
											}
										>
											Reject
										</button>
									
                </TableCell>    
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    )
  }
  