# -*- mode: python ; coding: utf-8 -*-

a = Analysis(
    ['web_server.py'],
    pathex=[],
    binaries=[],
    datas=[
        ('static', 'static'),
    ],
    hiddenimports=[
        'deep_translator', 'reportlab', 'fitz',
        'fastapi', 'uvicorn', 'uvicorn.loops', 'uvicorn.protocols',
        'uvicorn.lifespan', 'anthropic',
        'pydantic', 'starlette', 'starlette.routing',
        'anyio', 'h11', 'httptools',
        'library_core',
        'services.indexer', 'services.metadata_extractor',
        'routes.papers', 'routes.search', 'routes.tags', 'routes.notes',
        'routes.ai', 'routes.scan', 'routes.settings',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='图书馆',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
