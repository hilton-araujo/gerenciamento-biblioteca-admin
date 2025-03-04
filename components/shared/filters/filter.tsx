import { TablePagination } from "@mui/material";
import { BiSearchAlt } from "react-icons/bi";
import { Input } from "../ui/input";
// import { Input } from "@nextui-org/react";

const FiltesPag = ({
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    totalCount,
    handleSearchChange
}: {
    rowsPerPage: any;
    page: any;
    handleChangePage: any;
    handleChangeRowsPerPage: any;
    totalCount: number;
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {

    return (
        <div>
            <div className="flex justify-between px-1 mt-4">
                <div className="flex md:flex-row">
                    <div className="flex w-full max-w-3xl items-center justify-start">
                        {/* <Input
                            isClearable
                            radius="sm"
                            className="w-[500px]"
                            classNames={{
                                input: [
                                    "text-black/90 dark:text-white/90",
                                    "placeholder:text-default-700/50",
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "w-full",
                                    "shadow-sm",
                                    "bg-white",
                                    "backdrop-blur-xl",
                                    "!cursor-text",
                                    "border",
                                    "border-black",
                                ],
                            }}
                            placeholder="Filtrar por CÓDIGO | TITULO | AUTOR"
                            startContent={<BiSearchAlt className=" pointer-events-none shrink-0 text-slate-400 dark:text-white/90" />}
                        // onChange={handleSearchChange}
                        // onClear={() => { setSearchTerm("") }}
                        /> */}
                        <Input
                            type="search"
                            placeholder="Filtrar por CÓDIGO | TITULO | AUTOR"
                            className="w-full md:w-96 truncate"
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Linhas por pagina:"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}–${to} de ${count}`
                    }
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    )
}

export default FiltesPag;