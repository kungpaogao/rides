import * as Popover from "@radix-ui/react-popover";
import { Auth } from "@supabase/ui";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiSearch, FiX } from "react-icons/fi";
import { basicFetchPostRes } from "../lib/basicFetch";
import { useNavigation } from "../lib/hooks/useNavigation";
import { queryToString } from "../lib/queryToString";
import { supabase } from "../lib/supabaseClient";
import BasicButton from "./BasicButton";
import SearchBar from "./SearchBar";

export type NavigationProps = {
  className?: string;
  isSearchVisible?: boolean;
};

export default function Navigation({
  className = "",
  isSearchVisible,
}: NavigationProps) {
  const { push, query } = useRouter();

  const { from, to, dt: date } = query;

  const [isSearchCollapsed, setIsSearchCollapsed] = useState(isSearchVisible);
  const collapseSearch = () => setIsSearchCollapsed(true);

  const { user } = Auth.useUser();
  const { redirect } = useNavigation();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    // TODO: show toast
    await basicFetchPostRes("/api/logout", {});
  }

  return (
    <Popover.Root open={!isSearchCollapsed}>
      <div
        className={`flex w-full items-center ${
          isSearchCollapsed || !isSearchVisible ? "" : "flex-wrap"
        } border-b py-2 px-2 text-left md:py-5 md:px-28 ${className}`}
      >
        {isSearchVisible && isSearchCollapsed && (
          <Link href="/">
            <BasicButton
              flat
              className="aspect-square rounded-full border-none p-3 md:hidden"
            >
              <FiArrowLeft title="Back" size={20} />
            </BasicButton>
          </Link>
        )}
        {isSearchVisible && !isSearchCollapsed && (
          <BasicButton
            flat
            className="aspect-square rounded-full border-none p-3 md:hidden"
            onClick={() => setIsSearchCollapsed(true)}
          >
            <FiX title="Close search" size={20} />
          </BasicButton>
        )}
        <span
          className={`${
            isSearchVisible ? "hidden " : ""
          } text-2xl font-bold md:block`}
        >
          <Link href="/">Cornell Rides</Link>
        </span>
        {isSearchVisible ? (
          <>
            <Popover.Content
              portalled={false}
              // onInteractOutside={collapseSearch} // TODO: fix this behavior for autocomplete
              align="start"
              onEscapeKeyDown={collapseSearch}
              className="radix-side-bottom:animate-slide-down"
            >
              <div className="-mt-1 w-screen border-b bg-white shadow-xl">
                <div className="mx-auto max-w-5xl px-5 pb-5 md:px-10">
                  <SearchBar
                    onSearchSubmit={collapseSearch}
                    from={queryToString(from)}
                    to={queryToString(to)}
                    date={queryToString(date)}
                  />
                </div>
              </div>
            </Popover.Content>
            <div className="flex-1 px-3 text-center">
              {isSearchCollapsed ? (
                <BasicButton
                  flat
                  className="rounded-lg border-gray-200 bg-gray-100 py-2 px-5"
                  onClick={() => setIsSearchCollapsed(false)}
                >
                  <div className="flex items-center gap-2">
                    <FiSearch />
                    <span className="font-semibold">
                      {queryToString(from).split(",")[0]}
                    </span>
                    <FiArrowRight title="to" />
                    <span className="font-semibold">
                      {queryToString(to).split(",")[0]}
                    </span>
                    <span>|</span>
                    <span>
                      {dayjs.utc(queryToString(date)).format("MMM DD")}
                    </span>
                  </div>
                </BasicButton>
              ) : (
                <div className="py-2 px-5 font-semibold">Edit your search</div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1" />
        )}
        {user ? (
          <BasicButton onClick={signOut}>Log out</BasicButton>
        ) : (
          <BasicButton onClick={() => push(`/login?redirect=${redirect}`)}>
            Log in
          </BasicButton>
        )}
      </div>
      <Popover.Anchor />
    </Popover.Root>
  );
}
