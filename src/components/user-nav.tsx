import {
    Avatar,
    AvatarFallback,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useAppDispatch, useTypedSelector, userActions } from "@/store"
import { removeSavedUser } from "@/store/slices/user/user.util"
import { useCallback, useEffect, useMemo } from "react"
  
  export const UserNav = () => {
    const {user} = useTypedSelector((state) => state.user)
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(userActions.getUser())
    }, [dispatch])

    const handleLogout = useCallback(() => {
      removeSavedUser();
      dispatch(userActions.logout());
    }, [dispatch])

    const name = useMemo(() => user?.name, [user]);
    const email = useMemo(() => user?.email, [user]);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{name?.[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  