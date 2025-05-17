import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import useDebounce from "@/common/hooks/use-debounce";

import { Input } from "../ui/input";

type SearchInputProps = {
    onSearch: (value: string) => void;
    delay?: number;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, delay = 500 }) => {
    const [input, setInput] = useState("");
    const debouncedValue = useDebounce(input, delay);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue]);

    return (
        <div className="relative w-full max-w-md">
            <Search
                className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
                size={18}
            />
            <Input
                type="text"
                placeholder="Search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pl-10"
            />
        </div>
    );
};

export default SearchInput;
