import type { SupportedLocale } from '@/types';
import { getCurrentLocale, getDefaultLocale, removeBaseUrl, resolvePath } from '@/utils';
import { Languages } from '@/controls/icon';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@/controls';

type LocaleOption = {
  locale: SupportedLocale;
  text: string;
};

type LocaleSelectorProps = {
  pathname: string;
};

const supportedLocales: LocaleOption[] = [
  { locale: 'en', text: 'English' },
  { locale: 'zh', text: '简体中文' },
];

function LocaleSelector({ pathname }: LocaleSelectorProps) {
  const defaultLocale = getDefaultLocale();
  const currentLocale = getCurrentLocale();
  const selectedKeys = new Set([currentLocale]);

  let unwrappedPath = removeBaseUrl(pathname);

  if (currentLocale !== defaultLocale) {
    unwrappedPath = unwrappedPath.slice(`/${currentLocale}`.length);
  }

  const changeLocale = (locale: SupportedLocale = currentLocale) => {
    if (locale === currentLocale) {
      return;
    }

    let targetPath: string;

    if (locale === getDefaultLocale()) {
      targetPath = unwrappedPath;
    } else {
      targetPath = `/${locale}${unwrappedPath}`;
    }

    location.href = resolvePath(targetPath);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Languages />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        items={supportedLocales}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={({ currentKey }) => changeLocale(currentKey as SupportedLocale)}
      >
        {(item: LocaleOption) => (
          <DropdownItem key={item.locale}>{item.text}</DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export default LocaleSelector;
