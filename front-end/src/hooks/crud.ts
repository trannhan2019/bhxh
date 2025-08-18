import { notifications } from "@mantine/notifications";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

type CrudOptions<T> = {
  queryKey: string;
  fetchFn: () => Promise<T[]>;
  deleteFn: (id: number) => Promise<void>;
};

export function useCrud<T>({ queryKey, fetchFn, deleteFn }: CrudOptions<T>) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [queryKey],
    queryFn: fetchFn,
    placeholderData: keepPreviousData,
  });

  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      notifications.show({
        title: "Thành công",
        message: "Xoá dữ liệu thành công",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Thất bại",
        message: "Xoá dữ liệu thất bại",
        color: "red",
      });
    },
  });

  return { ...query, ...mutation };
}
