tried using headless ui, it's not as good as radix

```typescriptreact
            <div className="w-full md:w-auto">
              <Menu as="div" className="relative">
                <Menu.Button as={Fragment}>
                  <BasicButton className="w-full">Email</BasicButton>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute w-56 right-0 border bg-white shadow-md p-2 rounded-md">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`rounded px-2 py-1 ${
                            active && "bg-slate-100"
                          }`}
                          href={`mailto:${email}`}
                        >
                          Send email
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => copyToClipboard(email)}
                          className="rounded focus:bg-slate-100 px-2 py-1"
                        >
                          Copy email
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu>
                <Menu.Button as={Fragment}>
                  <BasicButton className="w-full">Phone</BasicButton>
                </Menu.Button>
                <Menu.Items className="border bg-white shadow-md p-2 rounded-md">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className="rounded focus:bg-slate-100 px-2 py-1"
                        href={`tel:${phone}`}
                      >
                        Call phone
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    <button
                      onClick={() => copyToClipboard(phone)}
                      className="rounded focus:bg-slate-100 px-2 py-1"
                    >
                      Copy phone
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
```
